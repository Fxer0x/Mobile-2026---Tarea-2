import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import { Appbar, Button, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { addFavorite, isFavorite, removeFavorite } from '../services/storage';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-AR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });

export default function ArticleDetailScreen({ route, navigation }) {
  const { article } = route.params;
  const theme = useTheme();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    isFavorite(article.url).then(setFavorite);
  }, [article.url]);

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(article.url);
    } else {
      await addFavorite(article);
    }
    setFavorite(!favorite);
  };

  const handleShare = () =>
    Share.share({
      title: article.title,
      message: `${article.title}\n\n${article.url}`,
      url: article.url,
    });

  const handleOpenBrowser = () => Linking.openURL(article.url);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="" />
        <IconButton
          icon={favorite ? 'heart' : 'heart-outline'}
          iconColor={favorite ? theme.colors.error : undefined}
          onPress={toggleFavorite}
        />
        <Appbar.Action icon="share-variant" onPress={handleShare} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scroll}>
        {article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
        ) : null}

        <View style={styles.body}>
          <Chip icon="newspaper" compact style={styles.source}>
            {article.source.name}
          </Chip>

          <Text variant="headlineSmall" style={styles.title}>
            {article.title}
          </Text>

          <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
            {formatDate(article.publishedAt)}
            {article.author ? ` · ${article.author}` : ''}
          </Text>

          {article.description ? (
            <Text variant="bodyLarge" style={styles.description}>
              {article.description}
            </Text>
          ) : null}

          {article.content ? (
            <Text variant="bodyMedium" style={styles.content}>
              {article.content.replace(/\[\+\d+ chars\]/, '...')}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <Button mode="contained" icon="open-in-new" onPress={handleOpenBrowser} style={styles.button}>
              Leer artículo completo
            </Button>
            <Button mode="outlined" icon="share-variant" onPress={handleShare} style={styles.button}>
              Compartir
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1 },
  scroll:      { paddingBottom: 32 },
  image:       { width: '100%', height: 220 },
  body:        { padding: 16, gap: 12 },
  source:      { alignSelf: 'flex-start' },
  title:       { fontWeight: '800', lineHeight: 30 },
  description: { lineHeight: 24 },
  content:     { lineHeight: 22, opacity: 0.8 },
  actions:     { gap: 8, marginTop: 8 },
  button:      { borderRadius: 10 },
});
