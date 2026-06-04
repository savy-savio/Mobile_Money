import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../utils/apiClientBackend';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  username: string;
  phoneNumber: string;
  country: string;
  currency: string;
  accountType: string;
  pin: string;
  agreedToTerms: boolean | string;
}

interface VerifyEmailData {
  token: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface ResetPasswordData {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      userId: string;
      email: string;
      firstName: string;
      lastName: string;
      username: string;
      accountType: string;
    };
  };
}

// ─── Signup Hook ──────────────────────────────────────────────────────────────
export const useSignup = () => {
  return useMutation({
    mutationFn: async (signupData: SignupData) => {
      const response = await apiClient('auth/signup', {
        method: 'POST',
        body: JSON.stringify(signupData),
      });
      return response;
    },
  });
};

// ─── Verify Email Hook ────────────────────────────────────────────────────────
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (verifyData: VerifyEmailData) => {
      const response = await apiClient('auth/verify-email', {
        method: 'POST',
        body: JSON.stringify(verifyData),
      });
      return response;
    },
  });
};

// ─── Login Hook ───────────────────────────────────────────────────────────────
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loginData: LoginData) => {
      const { rememberMe, ...loginPayload } = loginData;
      
      const response = await apiClient('auth/login', {
        method: 'POST',
        body: JSON.stringify(loginPayload),
      }) as LoginResponse;

      if (response.data?.accessToken) {
        localStorage.setItem('loginToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // If remember me is checked, set a flag to persist session for 30 days
        if (rememberMe) {
          const expiryTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 days
          localStorage.setItem('rememberMeExpiry', expiryTime.toString());
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('rememberMeExpiry');
        }
      }

      queryClient.invalidateQueries({ queryKey: ['profile'] });
      return response;
    },
  });
};

// ─── Forgot Password Hook ─────────────────────────────────────────────────────
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiClient('auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return response;
    },
  });
};

// ─── Reset Password Hook ──────────────────────────────────────────────────────
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (resetData: ResetPasswordData) => {
      const response = await apiClient('auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(resetData),
      });
      return response;
    },
  });
};

// ─── Refresh Token Hook ───────────────────────────────────────────────────────
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const response = await apiClient('auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }) as RefreshTokenResponse;

      if (response.data?.accessToken) {
        localStorage.setItem('loginToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      return response;
    },
    onError: () => {
      // If refresh fails, force logout (tokens are invalid)
      localStorage.removeItem('loginToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};

// ─── Logout Hook ─────────────────────────────────────────────────────────────
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      queryClient.clear();
    },
  });
};

// ─── Auto-refresh utility ─────────────────────────────────────────────────────
// Call this once at app startup (e.g. in App.tsx or a top-level component).
// It silently refreshes the access token every 14 minutes so sessions stay alive.
//
// Usage:
//   import { startTokenRefreshInterval } from '../hooks/useAuth';
//   useEffect(() => {
//     const stop = startTokenRefreshInterval();
//     return stop;
//   }, []);
//
export function startTokenRefreshInterval(intervalMs = 14 * 60 * 1000): () => void {
  const id = setInterval(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const response = await apiClient('auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }) as RefreshTokenResponse;

      if (response.data?.accessToken) {
        localStorage.setItem('loginToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    } catch {
      // Token is invalid — clear session and redirect to login
      localStorage.removeItem('loginToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }, intervalMs);

  return () => clearInterval(id);
}
