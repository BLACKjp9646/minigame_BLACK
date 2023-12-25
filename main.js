const storage = localStorage;
var today = new Date();
day = "" + today.getFullYear() + "/" +(today.getMonth()+1)+"/"+(today.getDate()) 
$(document).ready(()=>{
//storage.clear()
for(let i = 1;i<storage.length+1;i++){
    $('.Changelog').append('<li>'+storage.getItem(i)+"</li>");
}
$("#upload").click(()=>{
    storage.setItem(storage.length+1, day +":"+($("#coment").val()));
    console.log(storage);
    $(".Changelog").children().remove();
    for(let i = 1;i<storage.length+1;i++){
        $('.Changelog').append('<li>'+storage.getItem(i)+"</li>");
    }
})
})