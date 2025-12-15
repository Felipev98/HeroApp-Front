import Swal from 'sweetalert2';

export const showSuccessToast = (message: string, title: string = 'Éxito'): void => {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showErrorToast = (message: string, title: string = 'Error'): void => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });
};

export const showInfoToast = (message: string, title: string = 'Información'): void => {
  Swal.fire({
    icon: 'info',
    title,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showWarningToast = (message: string, title: string = 'Advertencia'): void => {
  Swal.fire({
    icon: 'warning',
    title,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

