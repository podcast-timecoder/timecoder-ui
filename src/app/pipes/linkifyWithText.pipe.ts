import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
        name: 'linkifyWithText',
        pure: false
})

export class LinkifyWithTextPipe implements PipeTransform {
      
    transform(link: string): string {
        return this.linkify(link);
    }

    private linkify(plainText): string{
        if(!plainText){
            return plainText;
        }

        //URLs starting with http://, https://, or ftp://
        let replacePattern1 = /\[(.*?)\]/;
        let link = plainText.match(replacePattern1)

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        let replacePattern2 = /\(([^)]+)\)/;
        let text = plainText.match(replacePattern2);

        if(text && link){
            return `<a href='${link[1]}'>${text[1]}</a>`;
        }
        
       return plainText;
    }
}