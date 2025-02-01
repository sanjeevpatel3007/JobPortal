import toast from 'react-hot-toast';

// Success toast with custom styling
export const successToast = (message) => {
  toast.success(message, {
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
    duration: 3000,
  });
};

// Error toast with custom styling
export const errorToast = (message) => {
  toast.error(message, {
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
    duration: 4000,
  });
};

// Info toast with custom styling
export const infoToast = (message) => {
  toast(message, {
    icon: 'ℹ️',
    style: {
      background: '#3B82F6',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
    },
    duration: 3000,
  });
};

// Loading toast with custom styling
export const loadingToast = (message) => {
  return toast.loading(message, {
    style: {
      background: '#6B7280',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
    },
  });
}; 