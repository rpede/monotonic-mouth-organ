import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'caseCreated'
})
export class CaseCreatedPipe implements PipeTransform {
  transform(caseNo: string) {
    return new Date(Number.parseInt(caseNo) * 1000 * 60).toLocaleString();
  }
}
