import { Component } from '@angular/core';
import {} from "chrome";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  text: string = "Initial";


  onSave() {
    this.text = 'saved'
    var that = this;
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log('inside');
      that.text = 'inside';
      that.saveCurrentPage(tabs[0].id);
    });
  }

saveCurrentPage(tabId) {
    chrome.pageCapture.saveAsMHTML({
      tabId: tabId
    }, function (blob) {
      var url = URL.createObjectURL(blob);
      // Optional: chrome.tabs.remove(tabId); // to close the tab
      chrome.downloads.download({
        url: url,
        filename: 'whatever.mhtml'
      });
    });
  }

}
