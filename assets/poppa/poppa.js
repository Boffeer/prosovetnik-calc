let poppaClass = 'poppa';
let poppaOpenedClass = 'poppa--opened'

let poppaOverlayClass = 'poppa-overlay';
let poppaOverlayOpenedClass = 'poppa-overlay--opened';

let poppaAlignerClass = 'poppa-aligner';

let poppaCloserClass = 'poppa__closer';

let poppaToScrollBlockElement = 'html';
let poppaScrollBlockerClass = 'poppa-block-scrolling';


/**
 * 
 * Open popup
 * 
 * @param {string} $pop className or querySelecotr
 * @param {function} $onOpen function on open
 */

function openPop( $pop, $onOpen = null ) {
	if ( typeof $pop == 'object' ) {
		let poppaOverlay = document.querySelector('.' + $pop.classList[0] + '-overlay');
		poppaOverlay.classList.add(poppaOverlayOpenedClass)
		$pop.classList.add(poppaOpenedClass);
	} else if ( typeof $pop == 'string' ) {
		document.querySelector($pop + '-overlay').classList.add(poppaOverlayOpenedClass)
	} else {
		console.log('not valid vrgument type')
	}


	if ($onOpen != null) {
		$onOpen();
	}
}


/**
 * 
 * Close popup
 * 
 * @param {string} $pop className or querySelecotr
 * @param {function} $onClose function on open
 */
function closePop( $pop, $onClose = null) {
	if ( typeof $pop == 'object' ) {
		let poppaOverlay = document.querySelector('.' + $pop.classList[0] + '-overlay');
		poppaOverlay.classList.remove(poppaOverlayOpenedClass)
		$pop.classList.remove(poppaOpenedClass);
	} else if ( typeof $pop == 'string' ) {
		document.querySelector($pop + '-overlay').classList.remove(poppaOverlayOpenedClass)
		document.querySelector($pop).classList.remove(poppaOpenedClass);
	} else {
		console.log('not valid vrgument type')
	}

	if ($onClose != null) {
		$onClose();
	}
}


/**
 * 
 * Helper just for main function poppa
 * @param {*} $ 
 */
function closePopByOutsideClick($) {
	if ($.outOfPopClickClose !== false) {
		document.querySelector($.poppaOverlay).addEventListener('click', function(event) {
			/* Normally - event.tagert.class[0] on click outside the pop === 'pop-aligner' */
			if (event.target.classList[0] === poppaAlignerClass) {
				let pop = document.querySelector($.pop);
				let onClose = $.onClose;
				// closePop( pop, onClose );
				closePopCaller($);
				document.querySelector(poppaToScrollBlockElement).classList.remove(poppaScrollBlockerClass)
			}
		})
	}
}


function closePopCaller($)  {
	if ( $.destroyOnClose != true ) {
		closePop( $.pop, $.onClose)
	} else {
		function destroyPop() {
			$.savePop = document.querySelector($.poppaOverlay);
			document.querySelector($.poppaOverlay).remove();
			document.body.appendChild($.savePop)
		}
		closePop( $.pop, destroyPop);
	}

}
/**
 * 
 * @param {object} $pop querySelecotr for pop
 * @param {function} $onOpen callback on open
 * @param {function} $onClose  callback on close
 */
// function popToggle($pop, $onOpen, $onClose){
function popToggle($){
	let poppaOverlay = document.querySelector('.' + $.pop.classList[0] + '-overlay');
	let	isPopHidden = window.getComputedStyle(poppaOverlay).getPropertyValue('visibility') == 'hidden';
	// let pop = $.pop;
	if (isPopHidden) {
		openPop( $.pop, $.onOpen)
			document.querySelector(poppaToScrollBlockElement).classList.add(poppaScrollBlockerClass);
	} else {
		closePopCaller($);
		document.querySelector(poppaToScrollBlockElement).classList.remove(poppaScrollBlockerClass)
	}
}


/**
 * 
 * @param {} $poppaOverlay 
 * @param {*} $pop 
 */
function popaAddClasses($poppaOverlay, $pop) {
	if ($poppaOverlay != null || $poppaOverlay != undefined) {
		( !$poppaOverlay.classList.contains(poppaOverlayClass) )
			? $poppaOverlay.classList.add(poppaOverlayClass)
			: false ;
	}
	if ($pop != null || $pop != undefined) {
		( !$pop.classList.contains(poppaClass) )
			? $pop.classList.add(poppaClass)
			: false ;
	}
}



function createPopStructure($) {
	/* === Create main overlay j== */
	let jsPoppaOverlay = document.createElement('div');
	jsPoppaOverlay;
	jsPoppaOverlay.classList.add($.poppaOverlay.replace('.', ''));
	jsPoppaOverlay.classList.add(poppaOverlayClass);
	typeof($.customPopOverlayClass) == 'string'
		? jsPoppaOverlay.classList.add($.customPopOverlayClass) 
		: false
	
	document.querySelector('body').appendChild(jsPoppaOverlay);

	if ($.poppaOverlayCustomClass) {
		jsPopAlingner.classList.add(poppaOverlayCustomClass);
	}

	let jsPopAlingner = document.createElement('div');
	jsPopAlingner;
	jsPopAlingner.classList.add(poppaAlignerClass);
	typeof($.customPopAlignerClass) == 'string'
		? jsPopAlingner.classList.add($.customPopAlignerClass)
		: false
	jsPoppaOverlay.appendChild(jsPopAlingner);

	if ($.position) {
		console.log($.position)
		let vPosition;
		let hPosition;
		if ( $.position.includes('top') ) {
			vPosition = 'top';
			jsPopAlingner.classList.add(jsPopAlingner.classList[0] + '--' + vPosition);
		} else if ( $.position.includes('bottom') ) {
			vPosition = 'bottom';
			jsPopAlingner.classList.add(jsPopAlingner.classList[0] + '--' + vPosition);
		}
		if ( $.position.includes('left') ) {
			hPosition = 'left';
			jsPopAlingner.classList.add(jsPopAlingner.classList[0] + '--' + hPosition);
		} else if ( $.position.includes('right') ) {
			hPosition = 'right';
			jsPopAlingner.classList.add(jsPopAlingner.classList[0] + '--' + hPosition);
		}
	}
	if ($.popAlignerCustomClass) {
		jsPopAlingner.classList.add(popAlignerCustomClass);
	}
	/* === /Create main overlay === */


	let jsPopCloser = document.createElement('button');
	let closerCounter = 0;
	jsPopCloser;
	jsPopCloser.innerText = '×';
	jsPopCloser.addEventListener('click', function() {
		document.querySelector(poppaToScrollBlockElement).classList.remove(poppaScrollBlockerClass)
		closePopCaller($);
	})

	if ($.popCloser != undefined) {
		jsPopCloser.classList.add($.popCloser.replace('.', ''));
	}
	jsPopCloser.classList.add(poppaCloserClass);
	typeof($.customPopCloserClass) == 'string'
		? jsPopCloser.classList.add($.customPopCloserClass)
		: false
	


	let pop = document.querySelector($.pop)
	jsPopAlingner.appendChild(pop);
	// console.log('Now pop inside aligner');
	pop.classList.add(poppaClass);
	$.coolText == true
		? pop.classList.add('poppa--simple-text')
		: false
	// console.log('pop created');

	/* === none closer ====  */
	if ( $.closerType === 'none' ) {
		jsPopCloser.classList.add( poppaCloserClass + '--none' );
		pop.appendChild(jsPopCloser)
		closerCounter = 1;
	}
	
	/* === inner closer ====  */
	if ( $.closerType === 'inner' ) {
		jsPopCloser.classList.add( poppaCloserClass + '--inner' );
		pop.appendChild(jsPopCloser)
		closerCounter = 1;
	}

	/* === outer closer ====  */
	if ( $.closerType === 'outer')  {
		jsPopCloser.classList.add( poppaCloserClass + '--outer' );
		pop.appendChild(jsPopCloser)
		closerCounter = 1;
	}
	
	/* === corner close button === */
	if (closerCounter == 0) {
		jsPopAlingner.appendChild(jsPopCloser);
		jsPopCloser.classList.add( poppaCloserClass + '--corner' );
	}
	// console.log('Closer created');
}


function closeAllPops() {
	let allPops = [...document.querySelectorAll('.poppa')];
	allPops.map(pop => {
		closePop(pop);
	});
}

function poppa( $ ){
	let popaData = $;
	$.poppaOverlay = $.pop + '-overlay';

	createPopStructure(popaData);

	let poppaOverlay = document.querySelector( $.pop + '-overlay' );
	let pop = document.querySelector( $.pop );

	if ($.onLeavingTrigger == true) {
		let popShown = false;
		let onLeavingDelay;
		if ($.onLeavingDelay) {
			onLeavingDelay = 5000
		} else {
			onLeavingDelay = $.onLeavingDelay * 1000;
		}
		setTimeout(() => {
			document.addEventListener('mouseleave', function() {
				if (popShown === false) {
						openPop(pop);
						popShown = true;
					setTimeout(function(){
						popShown = false
					}, 120000)
				}
			})
		}, 5000)

	} else {
		const opener = [...document.querySelectorAll($.clickTrigger)];
		opener.map(trigger => {
			trigger.addEventListener("click", function() {
				popToggle({
					pop: pop,
					onOpen: $.onOpen,
					onClose: $.onClose,
				});
			})
		});
	}

	let closer;
	if (closer == undefined) {
		closer = poppaOverlay.querySelector('.' + poppaCloserClass);
	} else {
		closer = poppaOverlay.querySelector( $.popCloser );
	}

	
	poppaOverlay.removeAttribute('hidden');

	if ($.animation) {
		pop.classList.add( 'poppa--' + $.animation );
	} else {
		pop.classList.add( 'poppa--zoom-in' );
	}
	
	closer.addEventListener('click', function() {
		closePop( pop, $.onClose )
	});

	closePopByOutsideClick(popaData);

	if ($.timerTrigger != null) {
		if ( typeof($.timerTrigger) == 'number' ) {
			setTimeout(() => {
				openPop(pop);
			}, $.timerTrigger * 1000)
		}
	}

	if ( $.escCloser != false ) {
		document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 27) {
				closePop($.pop);
				document.querySelector(poppaToScrollBlockElement).classList.remove(poppaScrollBlockerClass)
            }
        });
	}

	if ( $.openedByDefault == true ) {
		openPop(pop);
		document.querySelector(poppaToScrollBlockElement).classList.add(poppaScrollBlockerClass)
	}

	// opener.map(mapped => mapped.addEventListener("click", () => popToggle(data.poppaOverlay, data.pop)));
	// closer.map(mapped => mapped.addEventListener('click', () => closePop(data.poppaOverlay, data.pop)));
}
