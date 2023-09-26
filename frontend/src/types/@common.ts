export interface ToastItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  title?: string;
}

export interface ImageFormData<T> {
  requestForm: T;
  imageData: Blob | null;
}
