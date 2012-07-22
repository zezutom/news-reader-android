package org.zezutom.newsreader.android;

import android.webkit.WebView;
import android.webkit.WebViewClient;

public class NewsClient extends WebViewClient {
	
	@Override
	public boolean shouldOverrideUrlLoading(WebView view, String url) {
		view.loadUrl("javascript:changeLocation('" + url + "');");
		return true;
	}

}
