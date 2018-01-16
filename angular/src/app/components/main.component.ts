import {Component,OnInit,AfterViewInit} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'






@Component({
    selector:'main',
    templateUrl:'../views/main.html',
    styleUrls: [
       '../../assets/vendor/rs-plugin/css/settings.css',
        '../../assets/vendor/rs-plugin/css/layers.css',
        '../../assets/vendor/rs-plugin/css/navigation.css',
        '../../assets/vendor/circle-flip-slideshow/css/component.css'
    ]

})




export class MainComponent implements OnInit{

public title:string;
 private loadAPI: Promise<any>;

    constructor(private _route:ActivatedRoute,private _router:Router){
      this.title='Componente Principal';

    }

        ngOnInit():void {
            this.loadAPI = new Promise((resolve) => {
                this.loadScript();
                resolve(true);
            });

    }


    //addJsToElement(src: string): HTMLScriptElement {
    //    const script = document.createElement('script');
    //    script.type = 'text/javascript';
    //    script.src = src;
    //    document.getElementsByTagName('head')[0].appendChild(script);
    //    return script;
    //}

    public loadScript() {
        var isFound = false;
        var scripts = document.getElementsByTagName("script")
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
                isFound = true;
            }
        }

        if (!isFound) {
            var dynamicScripts = [
                "../../assets/vendor/rs-plugin/js/jquery.themepunch.tools.min.js",
                "../../assets/vendor/rs-plugin/js/jquery.themepunch.revolution.min.js",
                "../../assets/vendor/circle-flip-slideshow/js/jquery.flipshow.min.js",
                "../../assets/js/views/view.home.js",
            ];
            for (var i = 0; i < dynamicScripts .length; i++) {
                let node = document.createElement('script');
                node.src = dynamicScripts [i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

        }
    }

}