
/*  https://mozilla.github.io/pdf.js/    -*/

// var url = './mifs.pdf';

// var url = this.dataset.pdf;


// The workerSrc property shall be specified.
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);






/*-------------------------- */

'use strict';

$(document).ready(function(){
	$('.btn-close').click(function(){
		$('.page').removeClass('is-hidden');

		$('.page-docs').hide();
		$('.document').hide();
	});

	$('[data-pdf]').on('click', function () {
    var way = $(this).data('pdf');
    var url = './' + way;

		var $open = $(this).data('pdf');

		$('.page').addClass('is-hidden');
		$('.page-docs').show();
		$('.document').hide();
		$('.' + $open).show();

    /**
     * Asynchronously downloads PDF.
     */
    PDFJS.getDocument(url).then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById('page_count').textContent = pdfDoc.numPages;

      // Initial/first page rendering
      renderPage(pageNum);
    });



		return false;
	});


  /*- video -*/
  $('.has-video').on('click', function () {
    $('.page-video').addClass('is-active');
    $('#video-start').each(function () {
        this.currentTime = 0
        this.play();
      });

  });
  $('#video-start').on('click', function () {
    if ($('#video-start').get(0).paused) {  // если видео остановлено, запускаем
            $(this).get(0).play();
            console.log('play');
        } else {
            $(this).get(0).pause();
            console.log('pause');
        }
  })
});


