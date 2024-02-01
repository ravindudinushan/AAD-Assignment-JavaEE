function saveUpdateAlert(vale) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: vale +' Update Successfully..!',
        showConfirmButton: false,
        timer: 2500
    });
}

function saveAlert(vale) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: vale+' Save Successfully..!',
        showConfirmButton: false,
        timer: 2500
    });
}

function deleteAlert(vale) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: vale+' Delete Successfully..!',
        showConfirmButton: false,
        timer: 2500
    });
}

function unSuccessUpdateAlert(vale,vale2) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: vale + " "+vale2,
        showConfirmButton: false,
        timer: 2500
    })
}

function yesNoAlertIDelete(value) {
    Swal.fire({
        title: 'Do you want to Delete the \n' + value + ' ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
    }).then((result) => {
        if (result.isConfirmed) {
            if (deleteItems(value)) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Delete Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                $(this).remove();
                loadAllItems();
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Delete Unsuccessfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else if (result.isDenied) {
            Swal.fire(value + ' Delete Canceled!', '', 'info')
        }
    });
}

function emptyMassage(value) {
    let timerInterval
    Swal.fire({
        title:value +' Empty Result!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}



