// ------- Observable from scratch

// const observable = Rx.Observable.create((observer) => {
// 	observer.next('hello');
// 	observer.next('world');
// });
// observable.subscribe((val) => print(val));

// -------- Observable from events

// const clicks = Rx.Observable.fromEvent(document, 'click');
// clicks.subscribe((val) => print(val));

// ------- Observable from promise

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('resolved');
// 	}, 1000);
// });

// const obsvPromise = Rx.Observable.fromPromise(promise);
// obsvPromise.subscribe((result) => print(result));

// -------- Observable with interval

// const interval = Rx.Observable.interval(1000);
// interval.subscribe((int) => print(new Date().getSeconds()));

// -------- Observable with any data as a stream

// const allKindsOfData = Rx.Observable.of('anything', ['jirby', 'the', 'machine'], 26, true, { jirby: 'machine' });
// allKindsOfData.subscribe((val) => print(val));

// -------- Hot vs cold observable
// -------- Cold observable
// const cold = Rx.Observable.create((observer) => {
// 	observer.next(Math.random());
// });
// cold.subscribe((val) => print(`Subscriber1 got ${val}`));
// cold.subscribe((val) => print(`Subscriber2 got ${val}`));

// -------- Hot observable
// const cold = Rx.Observable.create((observer) => {
// 	observer.next(Math.random());
// });
// const hot = cold.publish();
// hot.subscribe((val) => print(`Subscriber1 got ${val}`));
// hot.subscribe((val) => print(`Subscriber2 got ${val}`));
// hot.connect();

// ---------- Unsubscribe from Observable
// const interval = Rx.Observable.interval(500).finally(() => print('Finished!'));
// const subscription = interval.subscribe((x) => print(x));
// setTimeout(() => {
// 	subscription.unsubscribe();
// }, 3000);

// -------- OPERATORS ----------------

// -------- Filter
// const numbers = Rx.Observable.of(-3, 5, 6, 2, -7, 9, -2);
// numbers.filter((n) => n >= 0).subscribe((n) => print(n));

// -------- First and Last
// const numbers = Rx.Observable.of(-3, 5, 6, 2, -7, 9, -2);
// numbers.first().subscribe((n) => print(n));
// numbers.last().subscribe((n) => print(n));

// -------- Throttle
// let mouseEvents = Rx.Observable.fromEvent(document, 'click');
// mouseEvents.throttleTime(1000).subscribe((e) => print(e.type));

// -------- Debounce
// let mouseEvents = Rx.Observable.fromEvent(document, 'click');
// mouseEvents
// 	.debounceTime(1000)
// 	.subscribe((e) => print(e.type));

// -------- DistinctUntilChanged
// const myArrayWithDuplicatesInARow = Rx.Observable
// 	.from([1, 1, 2, 2, 3, 1, 2, 3]);

// const distinctSub = myArrayWithDuplicatesInARow
// 	.distinctUntilChanged()
// 	//output: 1,2,3,1,2,3
// 	.subscribe(val => print(val));

// -------- Scan
// let clicks = Rx.Observable.fromEvent(document, 'click')
// clicks
// 	.map(e => parseInt(Math.random() * 10))
// 	.do(emitValue => print(`Emitted value is ${emitValue}`))
// 	.scan((accumulator, emitValue) => accumulator + emitValue)
// 	.subscribe(accumulator => print(`Accumulated value is ${accumulator}`))

// -------- SwitchMap
// let clicks = Rx.Observable.fromEvent(document, 'click')
// clicks.switchMap(click => {
// 	return Rx.Observable.interval(500)
// })
// 	.subscribe(i => print(i))

// -------- TakeUntil
// const interval = Rx.Observable.interval(500)
// const notifier = Rx.Observable.timer(2000)

// interval
// 	.takeUntil(notifier)
// 	.finally(() => print('Unsubscribed'))
// 	.subscribe(i => print(i))

// -------- TakeWhile
// const beastsAndNonBeasts = Rx.Observable.of('John', 'Yang', 'EveryoneElse')
// beastsAndNonBeasts
// 	.takeWhile(name => name != 'EveryoneElse')
// 	.finally(() => print('All beasts in the room found!'))
// 	.subscribe(notBeast => print(notBeast))

// -------- Buffer
// const myInterval = Rx.Observable.interval(1000);
// const bufferBy = Rx.Observable.fromEvent(document, 'click');
// const myBufferedInterval = myInterval.buffer(bufferBy);

// myBufferedInterval.subscribe(val => print(`Buffered values: ${val}`));

// -------- CombineLatest
// const timerOne = Rx.Observable.timer(1000, 4000);
// const timerTwo = Rx.Observable.timer(2000, 4000)
// const timerThree = Rx.Observable.timer(3000, 4000);

// const combined = Rx.Observable
// 	.combineLatest(
// 		timerOne,
// 		timerTwo,
// 		timerThree
// 	);

// combined.subscribe(latestValues => {
// 	const [timerValOne, timerValTwo, timerValThree] = latestValues;
// 	print(
// 		`Timer One Latest: ${timerValOne}, 
// 		Timer Two Latest: ${timerValTwo}, 
// 		Timer Three Latest: ${timerValThree}`
// 	);
// });

// -------- Concat
// const sourceOne = Rx.Observable.of(1, 2, 3);
// const sourceTwo = Rx.Observable.of(4, 5, 6);
// const concatSource = sourceOne.concat(sourceTwo);
// concatSource.subscribe(val => print(val));

// -------- Zip
// const yin = Rx.Observable.of('peanut butter', 'iron church', 'cats')
// const yang = Rx.Observable.of('jelly', 'jirby', 'Kay')

// const combo = Rx.Observable.zip(yin, yang)
// combo.subscribe(arr => print(arr))

// -------- ForkJoin
// const yin = Rx.Observable.of('peanut butter', 'iron church', 'cats')
// const yang = Rx.Observable.of('jelly', 'jirby', 'Kay').delay(2000)

// const combo = Rx.Observable.forkJoin(yin, yang)
// combo.subscribe(arr => print(arr))

// -------- Catch
// const observable = Rx.Observable.create(observer => {
// 	observer.next('good')
// 	observer.next('great')
// 	observer.next('grand')

// 	throw 'S&P RRT!'
// 	observer.next('Post RRT Retro')
// })

// observable
// 	.catch(err => print(`Error caught: ${err}`))
// 	.subscribe(val => print(val))

// -------- Retry
// const observable = Rx.Observable.create(observer => {
// 	observer.next('good')
// 	observer.next('great')
// 	observer.next('grand')

// 	throw 'S&P RRT!'
// 	observer.next('Post RRT Retro')
// })

// observable
// 	.catch(err => print(`Error caught: ${err}`))
// 	.retry(2)
// 	.subscribe(val => print(val))



// ---------- Subject
// const subject = new Rx.Subject()

// const subA = subject.subscribe(val => print(`SubA: ${val}`))
// const subB = subject.subscribe(val => print(`SubB: ${val}`))

// subject.next('Hello')
// setTimeout(() => {
// 	subject.next('World')
// }, 2000)

// -------- Multicast
// const observable = Rx.Observable.fromEvent(document, 'click');
// const clicks = observable.do(() => print('Do One Time!'))

// const subject = clicks.multicast(() => new Rx.Subject());

// const subA = subject.subscribe(c => print(`Sub A: ${c.timeStamp}`))
// const subB = subject.subscribe(c => print(`Sub B: ${c.timeStamp}`))

// subject.connect()

// Helper function to print values to the page
function print(val) {
	let el = document.createElement('p');
	el.innerText = val;
	document.body.appendChild(el);
}
