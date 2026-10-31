import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { gatedVideosData } from '../../../data/resources';

// Secret key for HMAC token signing (falls back to secure fixed secret if env not set)
const AUTH_SECRET = process.env.VIDEO_AUTH_SECRET || 'seyol-video-auth-secure-secret-2026';

interface VideoUserRecord {
  name: string;
  email: string;
  passwordHash: string;
  stage?: string;
  createdAt: string;
}

// In-memory user registry for the server instance, pre-seeded with demo accounts
const registeredUsers = new Map<string, VideoUserRecord>([
  [
    'parent@seyol.com',
    {
      name: 'Valued Parent',
      email: 'parent@seyol.com',
      passwordHash: hashPassword('password123'),
      stage: 'Expecting Mother',
      createdAt: new Date().toISOString(),
    },
  ],
  [
    'ananya.r@example.com',
    {
      name: 'Ananya Ramachandran',
      email: 'ananya.r@example.com',
      passwordHash: hashPassword('password123'),
      stage: 'Postpartum Recovery',
      createdAt: new Date().toISOString(),
    },
  ],
]);

function hashPassword(password: string): string {
  return crypto.createHmac('sha256', AUTH_SECRET).update(password).digest('hex');
}

function signToken(payload: object): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [data, signature] = parts;
    if (!data || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

function extractToken(request: Request, body?: any): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  // Check body
  if (body?.token) {
    return body.token;
  }

  // Check cookie header
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/seyol_video_session=([^;]+)/);
  if (match) {
    return match[1];
  }

  return null;
}

export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
    }

    const { action } = body;

    // 1. SIGN UP
    if (action === 'signup') {
      const { name, email, password, stage } = body;

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Please enter your full name (at least 2 characters).' },
          { status: 400 }
        );
      }

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return NextResponse.json(
          { error: 'Please enter a valid email address.' },
          { status: 400 }
        );
      }

      if (!password || typeof password !== 'string' || password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long.' },
          { status: 400 }
        );
      }

      const normalizedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      // Register or update user
      registeredUsers.set(normalizedEmail, {
        name: trimmedName,
        email: normalizedEmail,
        passwordHash: hashPassword(password),
        stage: stage || 'General Family Care',
        createdAt: new Date().toISOString(),
      });

      // Generate HMAC session token (valid 30 days)
      const token = signToken({
        email: normalizedEmail,
        name: trimmedName,
        stage: stage || 'General Family Care',
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Account created successfully. Video library unlocked.',
        token,
        user: {
          name: trimmedName,
          email: normalizedEmail,
          stage: stage || 'General Family Care',
        },
      });

      // Set cookie for browser persistence
      response.cookies.set('seyol_video_session', token, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
      });

      return response;
    }

    // 2. LOG IN
    if (action === 'login') {
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { error: 'Please enter both email and password.' },
          { status: 400 }
        );
      }

      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = registeredUsers.get(normalizedEmail);

      // Verify credentials
      if (!existingUser) {
        // If it's a first-time test parent logging in, accept standard email + password if password >= 6
        if (password.length >= 6) {
          const derivedName = normalizedEmail.split('@')[0].replace(/[._-]/g, ' ');
          const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
          
          registeredUsers.set(normalizedEmail, {
            name: formattedName,
            email: normalizedEmail,
            passwordHash: hashPassword(password),
            stage: 'Family Member',
            createdAt: new Date().toISOString(),
          });

          const token = signToken({
            email: normalizedEmail,
            name: formattedName,
            stage: 'Family Member',
            exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
          });

          const response = NextResponse.json({
            success: true,
            message: 'Logged in successfully. Video library unlocked.',
            token,
            user: {
              name: formattedName,
              email: normalizedEmail,
              stage: 'Family Member',
            },
          });

          response.cookies.set('seyol_video_session', token, {
            path: '/',
            httpOnly: false,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
          });

          return response;
        }

        return NextResponse.json(
          { error: 'No account found with this email. Please click Sign Up to create an account.' },
          { status: 401 }
        );
      }

      const incomingHash = hashPassword(password);
      if (existingUser.passwordHash !== incomingHash) {
        return NextResponse.json(
          { error: 'Incorrect password. Please try again or use the demo credentials.' },
          { status: 401 }
        );
      }

      // Generate HMAC session token
      const token = signToken({
        email: existingUser.email,
        name: existingUser.name,
        stage: existingUser.stage,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Logged in successfully. Video library unlocked.',
        token,
        user: {
          name: existingUser.name,
          email: existingUser.email,
          stage: existingUser.stage,
        },
      });

      response.cookies.set('seyol_video_session', token, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
      });

      return response;
    }

    // 3. VERIFY SESSION
    if (action === 'verify') {
      const token = extractToken(request, body);

      if (!token) {
        return NextResponse.json(
          { authenticated: false, error: 'No active session found.' },
          { status: 401 }
        );
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json(
          { authenticated: false, error: 'Invalid or expired session token.' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          name: decoded.name,
          email: decoded.email,
          stage: decoded.stage,
        },
      });
    }

    // 4. GET VIDEO ACCESS (BACKEND AUTH CHECK FOR VIDEO PLAYBACK)
    if (action === 'get-video-access') {
      const token = extractToken(request, body);
      const { videoId } = body;

      if (!token) {
        return NextResponse.json(
          { 
            authenticated: false, 
            error: 'Login Required to Watch Videos. Please log in or sign up.' 
          },
          { status: 401 }
        );
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json(
          { 
            authenticated: false, 
            error: 'Session invalid or expired. Login Required to Watch Videos.' 
          },
          { status: 401 }
        );
      }

      const targetVideo = gatedVideosData.find((v) => v.id === videoId) || gatedVideosData[0];

      return NextResponse.json({
        authenticated: true,
        videoId: targetVideo.id,
        youtubeId: targetVideo.youtubeId,
        title: targetVideo.title,
        embedUrl: `https://www.youtube-nocookie.com/embed/${targetVideo.youtubeId}?autoplay=1&rel=0`,
        authorizedUser: decoded.name || decoded.email,
      });
    }

    return NextResponse.json(
      { error: `Unknown action: "${action}". Supported actions: signup, login, verify, get-video-access.` },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Video auth route error:', error);
    return NextResponse.json(
      { error: 'Internal server authentication error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const token = extractToken(request);

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      name: decoded.name,
      email: decoded.email,
      stage: decoded.stage,
    },
  });
}
