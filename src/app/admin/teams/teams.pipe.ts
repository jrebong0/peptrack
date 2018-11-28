import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'projectFilter'})

export class ProjectFilterPipe implements PipeTransform {
    transform(value: string, projectList: any): string {
        console.log('value', value, 'projectList', projectList);
        const result = projectList.filter(item=> {return item.key === value})[0];
        return result ? result.name : '';
    }
}
