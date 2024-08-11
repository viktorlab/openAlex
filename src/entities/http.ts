export type HttpResponse<T> = {
  meta: {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
    group_count: number;
  };
  results: T[];
};
