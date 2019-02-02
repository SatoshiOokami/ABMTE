import { Anime } from "./anime";

export class Search {
    last_page: number;
    request_cache_expiry: number;
    request_cache: boolean;
    request_hash: string;
    results: Array<Anime>;
  }