import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFavorites } from '../services/storage';
import ArticleCard from '../components/ArticleCard';

export default function FavoritesScreen({ navigation }) {
  const theme = useTheme();
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites);
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="Favoritos" titleStyle={{ fontWeight: '700' }} />
      </Appbar.Header>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={64} color={theme.colors.outline} />
          <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
            No tenés favoritos todavía
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.outline, textAlign: 'center' }}>
            Guardá artículos tocando el ícono de corazón
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              onPress={() => navigation.navigate('ArticleDetail', { article: item })}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty:     { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 32 },
  list:      { paddingVertical: 8, paddingBottom: 20 },
});
