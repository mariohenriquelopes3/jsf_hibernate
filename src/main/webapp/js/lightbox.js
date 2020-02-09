var LightBox = {};

LightBox.parseNivel = function(nivel) {
	return ((nivel == undefined) ? '1' : nivel);
};
LightBox.renderLightBox = function(html, maxWidth, nivel, fnDone) {
	nivel = LightBox.parseNivel(nivel);
	document.querySelector('.divLightbox' + nivel + ' + div > div').style.maxWidth = maxWidth;
	document.querySelector('.divLightbox' + nivel + ' + div > div').innerHTML = html;
	
	// exibir
	document.querySelector('.divLightbox' + nivel).style.display = 'block';
	document.querySelector('.divLightbox' + nivel + ' + div').style.display = 'block';
	document.querySelector('.divLightbox' + nivel + ' + div > div').style.transform = 'scale(0, 0)';
	setTimeout(function() {
		document.querySelector('.divLightbox' + nivel + ' + div > div').style.transform = 'scale(1, 1)';
		if (fnDone != undefined) {
			fnDone();
		}
	}, 50);
};
LightBox.hideLightBox = function(nivel) {
	nivel = LightBox.parseNivel(nivel);
	document.querySelector('.divLightbox' + nivel + ' + div > div').innerHTML = '';
	document.querySelector('.divLightbox' + nivel).style.display = 'none';
	document.querySelector('.divLightbox' + nivel + ' + div').style.display = 'none';
};
LightBox.getHtmlClose = function(htmlTitle, nivel) {
	nivel = LightBox.parseNivel(nivel);
	var res = '';

	res += '<div class="titlePopup">';
	res += htmlTitle;
	res += '	<a class="lnkClose" href="javascript:LightBox.hideLightBox(' + nivel + ');">';
	res += '		<svg viewBox="0 0 762 762">';
	res += '			<g><polygon fill="#ffffff" points="751,85 677,11 381,306 85,11 11,85 306,381 11,677 85,751 381,456 677,751 751,677 456,381" /></g>';
	res += '		</svg>';
	res += '	</a>';
	res += '</div>';		

	return res;
};
LightBox.statusLightBox = function(HtmlMsg, timeMiliSec, isError, nivel) {
	if (timeMiliSec == undefined) {
		timeMiliSec = 2600;
	}
	if (isError == undefined) {
		isError = false;
	}
	
	var res = '';
	if (timeMiliSec < 0) {
		res += LightBox.getHtmlClose('Mensagem', nivel);
	}
	res += '<div style="padding: 24px 0px;text-align: center;">';
	// svg
	if (isError) {
		res += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ';
		res += '	 viewBox="0 0 50 50" style="width:54px;height:auto;enable-background:new 0 0 50 50;" xml:space="preserve"> ';
		res += '		<circle style="fill:#D75A4A;" cx="25" cy="25" r="25"/> ';
		res += '		<polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" points="16,34 25,25 34,16" /> ';
		res += '		<polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" points="16,16 25,25 34,34" /> ';
		res += '</svg> ';
	} else {
		res += '<svg id="svgSuccessLightbox" viewBox="0 0 86 86" style="width: 72px;height:auto;"> ';
		res += '  <circle cx="43" cy="43" r="34" fill="#6AC259" /> ';
		res += '  <path d="M19 41 L35 56 L49 41 L64 26" stroke="#F3F3F3" stroke-width="7" fill="none" /> ';
		res += '</svg> ';
	}
	// fim svg
	res += '			<br /><br /><span>' + HtmlMsg + '</span>';
	res += '</div>';
	
	LightBox.renderLightBox(res, '500px', nivel, undefined);

	if (timeMiliSec >= 0) {
		setTimeout(function(){ LightBox.hideLightBox(nivel); }, timeMiliSec);
	}
	
	if (!isError) {
		var p = document.querySelector('#svgSuccessLightbox path');
		p.style.strokeDasharray = '0, ' + p.getTotalLength();
		setTimeout(function() {
			p.style.strokeDasharray = p.getTotalLength() + ', 0';
		}, 100);
	}
};
LightBox.loading = function(htmlTitle, fnDone, nivel) {
	if (htmlTitle == undefined) {
		htmlTitle = 'Carregando...';
	}
	
	var res = '';
	res += '<div style="padding: 4px 0px;">';
	res += '	<div style="text-align: center;"><div class="loaderLightbox"></div></div>';
	res += '	<div style="text-align: center;"><div style="display: inline-block;">' + htmlTitle + '</div></div>';
	res += '</div>';
	LightBox.renderLightBox(res, '180px', nivel, fnDone);	
};

// ESC EVENT -> Close
window.addEventListener('keyup', function(e){
	if (e.code == 'Escape') {
		if (document.querySelector('.divLightbox2').style.display == 'block') {
			LightBox.hideLightBox(2);
		} else {
			LightBox.hideLightBox(1);
		}
	}
});