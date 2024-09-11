export class Inputs {
  private key: string;
  private required: Boolean;
  private validations: any;
  constructor(key: string, required: Boolean, validations: any) {
    this.key = key;
    this.required = required;
    this.validations = validations;
  }

  public GetKey() { return this.key; }

  public SetKet(key: string) { this.key = key; }

  public GetRequired() { return this.required; }

  public SetRequired(required: Boolean) { this.required = required; }

  public GetValidations() { return this.validations; }

  public SetValidations(validations: any) { this.validations = validations; }
}

export class Validator {
  public ValidateFields(fields: Inputs[], payload: any) : Boolean {
    for (let field of fields) {
      if (field.GetRequired() && !payload[field.GetKey()]) {
        return false;
      }
    }
    return true;
  }

  public GetInvalidFields(fields: Inputs[], payload: any) : string[] {
    let inputs: string[] = [];

    for (let field of fields) {
      if (field.GetRequired() && !payload[field.GetKey()]) {
        inputs.push(field.GetKey());
      }
    }

    return inputs;
  }
}

export class PayloadSerializer {
  public SerializeToFormData(payload: any, body: FormData) : any {
    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        console.log(key, payload[key]);
        body.append(key, payload[key]);
      }
    });
    return body;
  }
}