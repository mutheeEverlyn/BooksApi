import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.number() 
});



