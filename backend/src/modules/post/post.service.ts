import { db } from '@data/index';
import { Query } from '@utils/query';
import { sql } from 'drizzle-orm';

export class PostService {
  public async all(query?: Query) {
    const orderBy = query?.sort === 'ASC' ? 'ASC' : 'DESC';

    let sqlQuery = sql`
      SELECT p.*, COALESCE(avg(r.rate), 0) AS average_rate
      FROM posts p
      LEFT JOIN reviews r ON p.id = r.post_id
      GROUP BY p.id
      ORDER BY average_rate DESC;`;

    if (orderBy === 'ASC') {
      sqlQuery = sql`
        SELECT p.*, COALESCE(avg(r.rate), 0) AS average_rate
        FROM posts p
        LEFT JOIN reviews r ON p.id = r.post_id
        GROUP BY p.id
        ORDER BY average_rate ASC;`;
    }

    const data = await db.execute(sqlQuery);

    return data.rows;
  }
}
