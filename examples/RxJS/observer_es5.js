// Observer 패턴 또는 커스텀 이벤트 패턴

var publisher = { //Observer 패턴 구현 [ like system ]
    subscribers: {
        any: []
        // daily: [joe.drinkeCoffee]
        // monthly: [joe.sundayPreSnap]
    },
    subscribe: function(fn, type) { //구독자를 추가한다. to subscribers
        type = type || 'any';
        if(typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = []; //subscribers의 공간 중 undefined인 곳을 빈 배열로 초기화
        }

        //joe의 drinkCoffee 가 any타입으로 등록됨
        //joe의 sundayPreSnap 이 monthly타입으로 등록됨
        this.subscribers[type].push(fn);
    },
    unsubscribe: function(fn, type) { //구독자를 제거한다. in subscribers
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function(publication, type) { //subscribers 또는 구독자들을 순회하며 발행자를 등록했을 때 제공한 메서드들을 호출한다.
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) { //구독자들을 순회한다.
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for(i = 0; i < max; i+= 1) {
            if(action === 'publish') {
                subscribers[i](arg); //drinkCoffee를 실행, sundayPreSnap을 실행
            } else {
                if(subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};

//발행자를 만들어주는 함수
function makePublisher(o) {
    //여기서는 paper에 옵저버 기능들을 주입시키는 역할을 한다. [ 구독자들에게 발생, 구독자를 추가, 구독자를 해제, 구독자들을 순회 ]
    if(publisher !== undefined && o !== undefined) {
        var i;
        for(i in publisher) {
            if(publisher[i] === 'function') {
                o[i] = publisher[i];
            }
        }

        //paper의 구독자들을 담아놓는 공간을 초기화함.
        o.subscribers = { any: [] };
    }
}


// --- 옵저버 패턴을 구현하는 Structure
//구독자에게 발행할 행동들을 publish 메서드를 통해 정의한다. (구독자에게 순회하며 발행시킬 메서드를 의미)
var paper = {
    daily: function() {
        this.publish('big news today'); //daily를 통해 any 구독자들에게 발행될 때 일어나는 액션을 정의
    },
    monthly: function() {
        this.publish('interesting analysis', 'monthly'); //monthly로 monthly를 구독하는 구독자에게 발행할 때 일어나는 액션을 정의
    }
};

//paper를 발행자로서 등록 === Observer 패턴의 시스템을 갖출 수 있도록 한다.
makePublisher(paper);

//joe == 구독자와 구독자의 행동을 정의
var joe = {
    drinkCoffee: function(paper) {
        console.log(paper + '를 읽었습니다.');
    },
    sundayPreNap: function(monthly) {
     ;//   console.log('잠들기 전에 ' + monthly + ' 를 읽고 있습니다.');
    }
};

//joe가 paper를 구독한다.
paper.subscribe(joe.drinkCoffee); //joe의 drinkeCoffee를 paper에 구독 = any에 구독자를 등록한다.
paper.subscribe(joe.sundayPreNap, 'monthly'); // monthly에 구독자를 등록한다.

paper.daily(); //any를 구독하는 사람들이게 모두 발행
paper.daily();
paper.daily();
paper.monthly(); //monthly를 구독하는 사람들이게 모두 발행