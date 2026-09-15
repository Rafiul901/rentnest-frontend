import Swal from "sweetalert2";

export const confirmDelete = async (title: string) => {
  const result = await Swal.fire({
    title: "Delete property?",
    html: `Are you sure you want to delete <b>${title}</b>?<br/><span style="font-size: 13px; color: #6b7280;">This action cannot be undone.</span>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626", // red-600
    cancelButtonColor: "#6b7280",   // gray-500
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
};