let key_judge = 0;
let mode = 0;

window.addEventListener('keyup', function(event){

    // Roullet.js 参照：http://pannyatto.firebird.jp/archives/1938
    if(event.key == ' ' && key_judge == 0){
        // デバック用
        //console.log(event.key);
        
        key_judge = 1;

        // ページ読み込み後1階のみroulette.jsの初期セットアップ
        // それ以後は、ルーレットのスタート処理のみを動かす
        // ※画像読込と同時に行おうとすると正常に動作しないため
        if(mode == 0){
            // コメントを非表示にする
            let commentElm = document.getElementById("comment");
            commentElm.style.display = "none";
            
            jQuery(function(){
                // ルーレットのオプション設定
                var option = {
                    speed : 10,
                    duration : 999,
                }
                
                $('div.roulette').roulette(option);
            });

            key_judge = 0;
            mode = 1;
        }
        else {
            jQuery(function(){
                $('div.roulette').roulette('start');
            });
        }
    }
    else if(event.key == ' ' && key_judge == 1){ 
        key_judge = 0;

        jQuery(function(){  
            $('div.roulette').roulette('stop');
        });
    }

    // デバック用
    //setTimeout(function(){console.log("keypress")}, 1000);
    //console.log(key_judge);
});

file_upload.onchange = function() {

    // コメントのテキスト内容を変更する
    let commentElm = document.getElementById("comment");
    commentElm.innerHTML = "<p>「Spaceキー」を押してください！<br>画像表示後は、「Spaceキー」を押すことで<br>ルーレットの開始を制御できます。<br>その後ルーレットは自動で停止します。</p>";

    // アップロードボタンを非表示にする
    let fileElm = document.getElementById("file_upload");
    fileElm.style.display = "none";

    // ファイルの内容を変数へ代入
    const picture_files = this.files;

    //console.log(picture_files);

    // ルーレット部分に画像を挿入する
    // 参照：https://qiita.com/kazu3306/items/4351761880d2b2fcb506
    let rouletteElm = document.getElementById("roulette");

    for(let i=0; i<picture_files.length; i++){
        // FileReaderのインスタンスを作成する
        let reader = new FileReader();
        
        // 変数
        let picture_datas;
        let imgElm;
        
        // ファイルの中身を取得後に処理を行う
        reader.addEventListener('load', function() {
            picture_datas = reader.result;

            imgElm = document.createElement('img');
            imgElm.src = picture_datas;
            rouletteElm.appendChild(imgElm);

            reader = new FileReader();   
        })

        reader.readAsDataURL(picture_files[i]);
    }
};

// 高さを自動で揃える処理
$(document).ready(function () {
    hsize = $(window).height();
    $(".roulette_container").css("height", hsize + "px");
});
$(window).resize(function () {
    hsize = $(window).height();
    $(".roulette_container").css("height", hsize + "px");
});