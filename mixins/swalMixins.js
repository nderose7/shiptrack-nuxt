import Swal from 'sweetalert2/dist/sweetalert2.js'

const swalMixins = {
  data() {
    return {
      Toast: Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "toast-style",
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      }),
       Modal: Swal.mixin({
        customClass: {
          popup: "modal-style",
        },
         }),
    };
  },
};

export default swalMixins;