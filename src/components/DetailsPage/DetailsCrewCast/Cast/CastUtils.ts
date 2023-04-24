import { icons } from "../../../../assets/icons/icons";
import { ExternalIDs } from "../../../../core/models/ExternalIds";
import { Person } from "../../../../core/models/Person";

type SocialNames = 'youtube' | 'homepage' | 'twitter' | 'wikidata' | 'instagram' | 'tiktok' | 'imdb' | 'facebook'
export interface ExternalLinkMap {
  icon: string;
  type: SocialNames;
  link: string;
}

const EXTERNAL_TYPES_CONFIG: Record<string, { type: SocialNames, url: string }> = {
  facebook_id: { type: 'facebook', url: 'https://www.facebook.com/' },
  imdb_id: { type: 'imdb', url: 'https://www.imdb.com/name/' },
  instagram_id: { type: 'instagram', url: 'https://www.tiktok.com/@' },
  tiktok_id: { type: 'tiktok', url: 'https://www.tiktok.com/@' },
  twitter_id: { type: 'twitter', url: 'https://twitter.com/' },
  wikidata_id: { type: 'wikidata', url: 'https://www.wikidata.org/wiki/' },
  youtube_id: { type: 'youtube', url: 'https://www.youtube.com/@' }
}

export class CastUtils {
  public static createExternalLinks(person: Person): ExternalLinkMap[] {
    const externals = Object.entries(person.external_ids || {}).filter(([ key, value ]) => !!EXTERNAL_TYPES_CONFIG[ key ] && value).map(([ key, value ]: [ string, ExternalIDs ]): ExternalLinkMap => {
      const CONFIG = EXTERNAL_TYPES_CONFIG[ key ];
      return {
        icon: icons[ CONFIG.type ],
        link: CONFIG.url + value,
        type: CONFIG.type
      }
    });
    if (person.homepage) {
      externals.push({
        icon: `./../../../../assets/logo/homepage`,
        link: person.homepage,
        type: "homepage"
      })
    }
    return externals;
  }
}