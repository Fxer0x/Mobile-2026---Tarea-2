import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Banner, Searchbar, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';
import CategoryCard from '../components/CategoryCard';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { isConnected } = useNetworkStatus();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('ArticleList', {
        query: searchQuery.trim(),
        categoryName: `"${searchQuery.trim()}"`,
      });
      setSearchQuery('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="NewsApp" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {!isConnected && (
        <Banner
          visible
          icon={({ size }) => <Ionicons name="wifi-outline" size={size} color="red" />}
        >
          Sin conexión a internet
        </Banner>
      )}

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.key}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.header}>
            <Searchbar
              placeholder="Buscar noticias..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              onSubmitEditing={handleSearch}
              style={styles.searchbar}
            />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Categorías
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() =>
              navigation.navigate('ArticleList', {
                category: item.key,
                categoryName: item.label,
              })
            }
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  headerTitle:  { fontWeight: '700' },
  header:       { paddingHorizontal: 6, paddingBottom: 4 },
  searchbar:    { margin: 10, borderRadius: 12 },
  sectionTitle: { marginLeft: 6, marginBottom: 4, fontWeight: '700' },
  list:         { paddingBottom: 16 },
});
