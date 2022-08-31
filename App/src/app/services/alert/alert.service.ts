import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, map, merge, Observable } from 'rxjs';
import { Toast, ToastSettings } from 'src/app/models/alerts.models';
import { BackdropComponent } from './components/backdrop/backdrop.component';

@Injectable({ providedIn: 'root' })
export class AlertService {

	private _backdropRef: ComponentRef<BackdropComponent>;

	private _toastController: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
	private _currentToast: Toast[] = [];

	constructor(private _app: ApplicationRef, private _factory: ComponentFactoryResolver, private _injector: Injector) {
		this._backdropRef = this._factory.resolveComponentFactory(BackdropComponent).create(this._injector);

		const toast$ = this._toastController.asObservable();

		const controller = combineLatest([toast$, toast$])
		.pipe(
			map(([toast, dialog]) => ({ toast, dialog }))
		);
		
		controller.subscribe(data => {
			data?.toast?.length || data.dialog?.length ? this._createBackdrop() : this._removeBackdrop();
		});
	}

	public showToast(message: string, settings: ToastSettings = { state: 'default' }): void {
		const toast: Toast = { id: new Date().getTime(), message, settings: {...settings, show: true }  };
		this._toastController.next(this._currentToast.concat(toast))
	}

	public getToast(): Observable<Toast[]> {
		return this._toastController.asObservable();
	}

	private _createBackdrop(): void {
		this._app.attachView(this._backdropRef.hostView);
		const element = (this._backdropRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		document.body.appendChild(element);
	}

	private _removeBackdrop(): void {
		this._app.detachView(this._backdropRef.hostView);
	}

}
