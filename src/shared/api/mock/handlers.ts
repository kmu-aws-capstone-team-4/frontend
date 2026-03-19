import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  // --- Auth & User ---
  http.post('/api/auth/signup', async () => {
    await delay(1000);
    return HttpResponse.json({ success: true, message: 'Account created successfully' });
  }),
  
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as Record<string, string>;
    await delay(1000);
    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json({
        token: 'mock-token-123',
        user: { id: 'u1', email: 'test@example.com', name: 'Test User' }
      });
    }
    return new HttpResponse('Unauthorized', { status: 401 });
  }),

  // --- Profile & Streaks ---
  http.get('/api/users/me', async () => {
    await delay(500);
    return HttpResponse.json({
      id: 'u1',
      email: 'test@example.com',
      nickname: 'TestUser',
      jobCategory: 'Frontend Developer',
      streakCount: 5,
    });
  }),

  // --- Resumes ---
  http.get('/api/resumes', async () => {
    await delay(800);
    return HttpResponse.json([
      { id: 'r1', title: 'Senior Frontend Resume', type: 'file', isActive: true, createdAt: '2026-03-01T10:00:00Z' },
      { id: 'r2', title: 'Backend Experience', type: 'text', isActive: false, createdAt: '2026-03-10T14:00:00Z' },
    ]);
  }),

  http.post('/api/resumes', async () => {
    await delay(1500);
    return HttpResponse.json({ id: 'r3', title: 'New Uploaded Resume', type: 'file', isActive: true });
  }),

  // --- Interviews ---
  http.post('/api/interviews/start', async () => {
    await delay(1000);
    return HttpResponse.json({ interviewId: 'int_123', status: 'ready' });
  }),
];
