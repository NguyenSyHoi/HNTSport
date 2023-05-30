import * as moment from "moment";
export class Util {
  public static autoSlashDate(event: any): string {
    if (event.which == 8) {
      if (moment(event.target.value, 'DD/MM/YYYY', true).isValid()) {
        return event.target.value
      } else return ''
    };
    let input = event.target.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    let values = input.split('/').map((v: any) => v.replace(/\D/g, ''));
    if (values[0]) values[0] = Util.checkValue(values[0], 31);
    if (values[1]) values[1] = Util.checkValue(values[1], 12);
    let output = values.map((v: string | any[], i: number) => v.length == 2 && i < 2 ? v + '/' : v);
    let result = output.join('').substr(0, 10)
    event.target.value = result;
    if (moment(result, 'DD/MM/YYYY', true).isValid()) {
      return result
    } else return ''
  }


  public static autoSlashDateTime(event: any): string {
    if (event.which == 8) {
      if (moment(event.target.value, 'DD/MM/YYYY HH:mm:ss', true).isValid()) {
        return event.target.value
      } else return ''
    };

    if (event.target.value.length > 19) {
      event.target.value = event.target.value.substr(0, 19);
      if (moment(event.target.value.substr(0, 19), 'DD/MM/YYYY HH:mm:ss', true).isValid()) {
        return event.target.value.substr(0, 19)
      } else return ''
    }

    let input = event.target.value;
    if (/\D\/\:\ $/.test(input)) input = input.substr(0, input.length - 3);
    let values = input.split(' ');
    let date = values[0];
    let time = values[1] ? values[1] : null;
    let dateSplit = date.split('/').map((v: string) => v.replace(/\D/g, ''));
    let timeSplit = time?.split(':').map((v: string) => v.replace(/\D/g, ''));
    if (dateSplit[0]) dateSplit[0] = Util.checkValue(dateSplit[0], 31);
    if (dateSplit[1]) dateSplit[1] = Util.checkValue(dateSplit[1], 12);
    if (timeSplit && timeSplit[0]) timeSplit[0] = Util.checkValue(timeSplit[0], 23);
    if (timeSplit && timeSplit[1]) timeSplit[1] = Util.checkValue(timeSplit[1], 59);
    if (timeSplit && timeSplit[2]) timeSplit[2] = Util.checkValue(timeSplit[2], 59);
    let dateOutput = dateSplit.map((v: string | any[], i: number) => v.length == 2 && i < 2 ? v + '/' : v);
    let timeOutput = timeSplit?.map((v: string | any[], i: number) => v.length == 2 && i < 2 ? v + ':' : v);
    let result;
    if (time) {
      result = dateOutput.join('') + ' ' + timeOutput.join('');
    } else {
      if (dateOutput.join('').length == 10) {
        result = dateOutput.join('') + ' ';
      } else result = dateOutput.join('')
    };
    result = result.substr(0, 19);
    event.target.value = result;
    if (moment(result, 'DD/MM/YYYY HH:mm:ss', true).isValid()) {
      return result
    } else return ''
  }
  private static checkValue(str: string, max: number) {
    if (str.charAt(0) !== '0') {
      let num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 0;
      str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
  };
  public static onlyNumber(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode > 31 && charCode < 43) || (charCode > 43 && charCode < 48) || (charCode > 57)) {
      return false;
    }
    return true;
  }
}
