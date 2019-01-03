import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Episode } from '../model/episode';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../model/theme';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  baseUrl: string = `${environment.apiUrl}/episodes`;
  themeBaseUrl = `${environment.apiUrl}/theme`;

  getAllEpisodes(): Observable<Episode[]> {
    return this.apiClient.get<Episode[]>(this.baseUrl)
  }

  constructor(private apiClient: HttpClient) { }


  createEpisode(value: Episode): any{
     return this.apiClient.post(this.baseUrl, value)
  }

  getServiceById(id: number): Observable<Episode> {
     return this.apiClient.get<Episode>(this.baseUrl+"/"+id)
  }

  addTheme(episodeId: any, value: Theme): Observable<Theme> {
    value.episodeId = episodeId
    return this.apiClient.post<Theme>(this.themeBaseUrl, value)
  }

  updateTimestamp(episodeId: Number, theme: Theme): any {
    return this.apiClient.post(`${this.baseUrl}/${episodeId}/theme/${theme.id}/timestamp`, null)
  }

  startEpisode(episode: Episode): any {
    return this.apiClient.post(`${this.baseUrl}/${episode.id}/start`, {})
  }

  stopEpisode(episode: Episode): any {
    return this.apiClient.post(`${this.baseUrl}/${episode.id}/stop`, {})
  }
}