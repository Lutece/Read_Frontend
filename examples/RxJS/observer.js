var publisher = { //Observer 패턴 구현
    subscribers: {
        any: []
    },
    subscribe: function(fn, type) { //구독자를 추가한다. to subscribers
        type = type || 'any';
        if(typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }

        this.subscribers[type].push(fn);
    },
    unsubscribe: function(fn, type) { //구독자를 제거한다. in subscribers
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function(publication, type) { //subscribers 또는 구독자들을 순회하며 등록할 때 제공한 메서드들을 호출한다.
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) { //구독자들을 순회한다.
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for(i = 0; i < max; i+= 1) {
            if(action === 'publish') {
                subscribers[i](arg);
            } else {
                if(subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};

function makePublisher(o) {
    //여기서는 paper에 옵저버 기능들을 주입시키는 역할을 한다. [ 구독자들에게 발생, 구독자를 추가, 구독자를 해제, 구독자들을 순회 ]
    if(publisher !== undefined && o !== undefined) {
        var i;
        for(i in publisher) {
            if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
                o[i] = publisher[i];
            }
        }
        //paper의 구독자들을 담아놓는 공간을 초기화함.
        o.subscribers = { any: [] };
    }
}

//구독자에게 발행할 행동들을 publish 메서드를 통해 정의한다. (구독자에게 순회하며 발행시킬 메서드를 의미)
var paper = {
    daily: function() {
        this.publish('big news today');
    },
    monthly: function() {
        this.publish('interesting analysis', 'monthly');
    }
};

makePublisher(paper); //paper를 등록함.

var joe = {
    drinkCoffee: function(paper) {
        console.log(paper + '를 읽었습니다.');
    },
    sundayPreNap: function(monthly) {
        console.log('잠들기 전에 ' + monthly + ' 를 읽고 있습니다.');
    }
};

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.daily();
paper.daily();
paper.monthly()