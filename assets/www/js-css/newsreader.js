var NEWS_URL = 'http://rss.news.yahoo.com/rss/';

var categories = new Array();
var categoryListItem = '<li><a href="#" onclick="loadNews(\'${code}\');">${title}</a></li>';
var defaultCategory =  '<li><a href="#" onclick="loadNews();">Latest News</a></li>';
var initialized = false;

// TODO replace cookies with client-side storage. Needs to be enabled in the WebView!
function init() {
	if (initialized) {
		return;
	}
	_setMenu();
	_showHomePage();
	initialized = true;
}

function _setMenu() {
	$('#add_category_link').on('click', function() {
		_showPage('category_editor');
	});

	$('#category_editor_home_link').on('click', function() {
		_showHomePage();
	});		

	$('#news_home_link').on('click', function() {
		_showHomePage();
	});	
	
	$('#category_add_button').bind('click', function() {
		var selection = $('#category_select option:selected');
		// TODO: add sanity checks
		_addCategory(selection.val(), selection.text());		
		_showHomePage();		
	});	
}

function _showHomePage() {
	_loadCategories();
	_showPage('home');
}

function _showPage(page) {
	$.mobile.changePage('#' + page + '_page', {changeHash:false});
}

function loadNews(category) {
	var url = NEWS_URL;
	
	if (category) {
		url += category;
	}
	
	$.ajax({
		type: 'get',
		url: url,
		dataType: 'xml',
		success: displayNews		
	});
}

function displayNews(data) {
	// TODO parse response data and create news items
}

function _loadCategories() {
	var categoryList = $('#category_list');
	categoryList.html(null);
	categoryList.append(defaultCategory);
	
	$.each(_getCategories(), function(index, category) {
		var item = categoryListItem
		.replace('${code}', category.code)
		.replace('${title}', category.title);
		categoryList.append(item);		
	});
	categoryList.listview('refresh');		
}

function _addCategory(code, title) {
	var entry = code + ':' + title;
	var categories = _getCookie();
	
	if (categories) {
		if (new RegExp(entry).test(categories)) {
			return;
		}
		categories += ';';
	}
	else {
		categories = '';
	}
	categories += entry;
	$.cookie('categories', categories);	
}

function _getCategories() {
	var cookie = _getCookie();
	
	if (!cookie) {
		return new Array();
	}
	
	var chunks = cookie.split(';');
	var categories = new Array();
	
	$.each(chunks, function(index, chunk) {
		if (!chunk) {
			return;
		}
		var parts = chunk.split(':');
		
		if (!parts || parts.length != 2) {
			return;
		}
		
		categories.push({'code': parts[0], 'title': parts[1]});
	}); 
	return categories;
}

function _getCookie() {
	return categories = $.cookie('categories');
}
function _isHome() {
	return $(location).attr('pathname').match(/index.htm$/g);
}