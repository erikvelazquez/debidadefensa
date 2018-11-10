import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Documentos } from './documentos.model';
import { DocumentosPopupService } from './documentos-popup.service';
import { DocumentosService } from './documentos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-documentos-pdfviewer-dialog',
    templateUrl: './documentos-pdfviewer-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ],
})
export class DocumentosPdfviewerDialogComponent implements OnInit {

    documentos: Documentos;
    imageData: any;
    isLoading: boolean;
    constructor(
        private documentosService: DocumentosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private eventManager2: JhiEventManager,
        private eventManager3: JhiEventManager,
        private domSanitizer: DomSanitizer,
    ) {
        this.isLoading = true;

    }

    ngOnInit() {
        this.documentosService.getFile(this.documentos.nombreDocumento,
                                        String(this.documentos.idCliente),
                                        String(this.documentos.tipoServicioId),
                                        String(this.documentos.idDocumento)).subscribe((data) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(blob);
            this.imageData = this.domSanitizer.bypassSecurityTrustResourceUrl(fileURL);
            this.isLoading = false;
            // window.open(fileURL);

        }, (error) => {
            console.log(error);
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        // {this.documentosService.delete(this.documentos.idCliente, id, this.documentos.tipoServicioId, this.documentos.idDocumento).subscribe((response) => {
        //     this.eventManager.broadcast({name: 'expedienteListModification', content: 'Deleted an documentos'});
        //     this.eventManager2.broadcast({name: 'tramiteMigratorioListModification', content: 'Deleted an documentos'});
        //     this.eventManager3.broadcast({name: 'tramiteGeneralListModification', content: 'Deleted an documentos'});
        //     this.activeModal.dismiss(true);
        // });}
    }
}

@Component({
    selector: 'jhi-documentos-pdfviewer-popup',
    template: ''
})
export class DocumentosPdfviewerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentosPopupService: DocumentosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentosPopupService
                .open(DocumentosPdfviewerDialogComponent as Component, params['idTramite'], params['tiposervicio'], params['idCliente'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
