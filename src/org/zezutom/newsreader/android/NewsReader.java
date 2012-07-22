package org.zezutom.newsreader.android;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class NewsReader extends Activity {

	private WebView view;
	
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		view = (WebView) findViewById(R.id.webview);
		view.setWebViewClient(new NewsClient());
		view.loadUrl("file:///android_asset/www/index.html");
		
		WebSettings settings = view.getSettings();		
		settings.setJavaScriptEnabled(true);		
	}
}
