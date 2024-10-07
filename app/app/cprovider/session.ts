// lib/session.ts
import { serialize, parse } from 'cookie';
import { NextApiResponse, NextApiRequest } from 'next';

const COOKIE_NAME_TOKEN = 'token';
const COOKIE_NAME_USER = 'user';


export const setCookies = (res: NextApiResponse, token: string, user: object) => {
  const tokenCookie = serialize(COOKIE_NAME_TOKEN, token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24, 
    path: '/', 
    sameSite: 'strict', 
  });

  const userCookie = serialize(COOKIE_NAME_USER, JSON.stringify(user), {
    httpOnly: false, 
    maxAge: 60 * 60 * 24,
    path: '/', 
    sameSite: 'strict', 
  });

  res.setHeader('Set-Cookie', [tokenCookie, userCookie]);
};


export const getCookies = (req: NextApiRequest) => {
  const cookies = req.headers.cookie;
  const token = cookies ? parse(cookies)[COOKIE_NAME_TOKEN] : null;
  const user = cookies ? JSON.parse(parse(cookies)[COOKIE_NAME_USER] || '{}') : null;
  return { token, user };
};
