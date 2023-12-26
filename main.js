/*const url = "./change.json";//ファイルの名前
const option = {"responseType":"blob"};//オプション
var today = new Date();
day = "" + today.getFullYear() + "/" +(today.getMonth()+1)+"/"+(today.getDate()) 
$(document).ready(()=>{
    axios.get(url,option).then(res=>{
    res.data.text().then(str=>{
        const jobj=JSON.parse(str);
        for(let i=0;i<jobj.data.length;i++){
            console.log(jobj.data[i]);
            $('.Changelog').append('<li>'+ jobj.data[i].clog +"</li>");
        }
    }).catch(err=>{
        console.log("ゆうりょすべきエラーだせ",err);
    })
})

//storage.clear()
$("#upload").click(()=>{
    $(".Changelog").children().remove();
    axios.get(url,option).then(res=>{
        res.data.text().then(str=>{
            const jobj=JSON.parse(str);
            var adddata = { clog : day +":"+($("#coment").val())};
            jobj.data.push(adddata);
            for(let i=0;i<jobj.data.length;i++){
                console.log(jobj.data[i]);
                $('.Changelog').append('<li>'+ jobj.data[i].clog +"</li>");
            }
        }).catch(err=>{
            console.log("ゆうりょすべきエラーだせ",err);
        })
    })
})
})*/