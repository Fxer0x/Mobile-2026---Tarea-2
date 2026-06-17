/**
 * Equivalente Android: Background Service
 * Usa expo-background-fetch + expo-task-manager para sincronizar
 * titulares periódicamente en segundo plano.
 */
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { fetchTopHeadlines } from "./newsApi";

export const BACKGROUND_FETCH_TASK = "background-fetch-news";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const articles = await fetchTopHeadlines("general");
    console.log(
      `[BackgroundService] Sincronizados ${articles.length} artículos`,
    );
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundFetch = async () => {
  const status = await BackgroundFetch.getStatusAsync();
  if (
    status === BackgroundFetch.BackgroundFetchStatus.Restricted ||
    status === BackgroundFetch.BackgroundFetchStatus.Denied
  ) {
    return;
  }
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15,
    stopOnTerminate: false,
    startOnBoot: true,
  });
};
