import { Component, OnInit } from '@angular/core';
import { LogService } from '../core/log.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: any[] = [];
  uniqueUserIds: number[] = [];
  selectedUserId: number | null = null;

  pageSize = 10; // Cantidad de registros por página
  currentPage = 1; // Página actual
  totalPages = 1; // Total de páginas
  pages: number[] = []; // Lista de números de página

  constructor(private logService: LogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    const token = this.authService.getToken();
    if (token !== null) {
      this.logService.getLogs(token)
        .subscribe(
          (data: any) => {
            this.logs = data;
            console.log('Logs:', this.logs); // Agregamos este console.log para verificar los registros
            this.extractUserIds();
            this.updatePagination();
          },
          (error) => {
            console.error('Error fetching logs:', error);
          }
        );
    } else {
      console.error('Token is null');
    }
  }

  extractUserIds(): void {
    this.uniqueUserIds = Array.from(new Set(this.logs.map(log => log.userID)));
  }

  updatePagination(): void {
    const totalItems = this.logs.length; // Usamos la longitud de logs en lugar de filteredLogs
    this.totalPages = Math.ceil(totalItems / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    if (this.currentPage > this.totalPages && this.currentPage !== 1) {
      this.currentPage = this.totalPages;
    }
  }

  setPage(page: number, event: MouseEvent): void {
    event.preventDefault(); // Evita la acción predeterminada del enlace
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination(); // Actualizamos la paginación y el filtrado
  }

  prevPage(event: MouseEvent): void {
    event.preventDefault(); // Evitar la acción predeterminada del enlace
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(event: MouseEvent): void {
    event.preventDefault(); // Evitar la acción predeterminada del enlace
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }


  get filteredLogs(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.logs.length); // Usamos Math.min para asegurarnos de no exceder la longitud del array
    const userId = typeof this.selectedUserId === 'string' ? parseInt(this.selectedUserId, 10) : this.selectedUserId;
    return this.logs.filter((log, index) => {
      return (!userId || log.userID === userId) && index >= startIndex && index < endIndex;
    });
  }

}
