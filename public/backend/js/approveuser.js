$(document).ready(function(){
    $("a.Approve").on("click", function(e){
        e.preventDefault(); //Khong cho the a chay ra url khac
        let id = $(this).attr('data-id');
        let status = $(this).attr('data-status');
        let userStatus = {
            valStatus: status
        }
    
        $.ajax({
            type: 'PUT',
            url: "/thay-doi-trang-thai/"+id,
            data: userStatus,
            success: function(newdata){
               location.href =  "/approveuser";     
            }
        });
    });
});