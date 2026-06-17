import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Text, useTheme } from 'react-native-paper';
import { fetchTopHeadlines, searchArticles } from '../services/newsApi';
import ArticleCard from '../components/ArticleCard';

export default function ArticleListScreen({ route, navigation }) {
  const { category, categoryName, query } = route.params;
  const theme = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadArticles = useCallback(async () => {
    try {
      setError(null);
      const data = query
        ? await searchArticles(query)
        : await fetchTopHeadlines(category);
      setArticles(data);
    } catch (e) {
      setError(e.message ?? 'Error desconocido');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category, query]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const onRefresh = () => {
    setRefreshing(true);
    loadArticles();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={categoryName} />
      </Appbar.Header>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              onPress={() => navigation.navigate('ArticleDetail', { article: item })}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>No se encontraron noticias</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  list:      { paddingVertical: 8, paddingBottom: 20 },
});
