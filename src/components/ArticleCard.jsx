import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('es-AR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

export default function ArticleCard({ article, onPress }) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
        {article.urlToImage ? (
          <Card.Cover source={{ uri: article.urlToImage }} style={styles.cover} />
        ) : null}
        <Card.Content style={styles.content}>
          <Text variant="labelSmall" style={{ color: theme.colors.primary }}>
            {article.source.name.toUpperCase()}
          </Text>
          <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          {article.description ? (
            <Text variant="bodySmall" numberOfLines={2} style={styles.description}>
              {article.description}
            </Text>
          ) : null}
          <View style={styles.footer}>
            <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
              {formatDate(article.publishedAt)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:        { marginHorizontal: 16, marginVertical: 6, borderRadius: 12 },
  cover:       { height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  content:     { paddingTop: 10, paddingBottom: 8, gap: 4 },
  title:       { fontWeight: '700', lineHeight: 22 },
  description: { opacity: 0.7 },
  footer:      { marginTop: 4 },
});
