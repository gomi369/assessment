'use strict'
const userNmaeInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {

    while (element.firstChild) {
        // 子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

const answers = [
    '{userName}さんのいいところは声です。{userName}さんの特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}さんのいいところはまなざしです。{userName}さんに見つめられた人は、気になって仕方がないでしょう。',
    '{userName}さんのいいところは情熱です。{userName}さんの情熱に周りの人は感化されます。',
    '{userName}さんのいいところは厳しさです。{userName}さんの厳しさがものごとをいつも成功に導きます。',
    '{userName}さんのいいところは知識です。博識な{userName}さんを多くの人が頼りにしています。',
    '{userName}さんのいいところはユニークさです。{userName}さんだけのその特徴が皆を楽しくさせます。',
    '{userName}さんのいいところは用心深さです。{userName}さんの洞察に、多くの人が助けられます。',
    '{userName}さんのいいところは見た目です。内側から溢れ出る{userName}さんの良さに皆が気を惹かれます。',
    '{userName}さんのいいところは決断力です。{userName}さんがする決断にいつも助けられる人がいます。',
    '{userName}さんのいいところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。',
    '{userName}さんのいいところは感受性です。{userName}さんが感じたことに皆が共感し、わかりあうことができます。',
    '{userName}さんのいいところは節度です。強引すぎない{userName}さんの考えに皆が感謝しています。',
    '{userName}さんのいいところは好奇心です。新しいことに向かっていく{userName}さんの心構えが多くの人に魅力的に映ります。',
    '{userName}さんのいいところは気配りです。{userName}さんの配慮が多くの人を救っています。',
    '{userName}さんのいいところはその全てです。ありのままの{userName}さん自身がいいところなのです。',
    '{userName}さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}さんが皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userNameユーザーの名前
 * @return{string}診断結果
 */
function assessment(userName) {

    //全文字のコード番号を取得してそれを足し合わせる
    //charCodeAt()は文字にをり振られた数字のこと、また()は何の文字目か、ということ
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;

    //replace(A, B); (replace)はAをBにおきかえる。
}

/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} element HTMLの要素
 * @param {string} result 診断結果のテキスト
 */
function appendAssessmentResult(element, result) {

    // result-area に h3 タグで'診断結果'という文字を表示
    const h3 = document.createElement('h3');
    h3.innerText = '診断結果';
    element.appendChild(h3);

    // result-area に p タグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    element.appendChild(p);
}

/**
 * 指定した要素にツイートボタンを設定する
 * @param {HTMLElement} element HTMLの要素
 *  * @param {string} massage ツイート本文
 */
function appendTweetButton(element, massage) {
    // aタグを作って属性を設定する
    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
    a.setAttribute('href', href);
    a.setAttribute('class', 'twitter-hashtag-button');
    a.setAttribute('data-text', massage);
    a.innerText = 'Tweet #あなたのいいところ';
    // aタグをHTMLとして追加する
    element.appendChild(a);

    // scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    // scriptタグをHTMLとして追加する
    tweetDivided.appendChild(script);
}

// 診断ボタンを押したら実行する
assessmentButton.onclick = function () {

    const userName = userNmaeInput.value;
    if (userName.length === 0) {      // (value) は中の文字、(length) は中の文字の数。
        // 名前が空の時は処理を終了する
        return;
    }

    //診断結果表示
    removeAllChildren(resultDivided);
    const result = assessment(userName);
    appendAssessmentResult(resultDivided, result);

    // Tweetエリアの作成
    removeAllChildren(tweetDivided);

    appendTweetButton(tweetDivided, result);
}

// 入力欄でEnterキーを押したときに診断を実行する
userNmaeInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

//テストコード
console.assert( //(assert)は検証やテストに使える
    assessment('太郎') === assessment('太郎'),
    '同じ診断結果ではありません。'
)