export const USER_TABLE = {
    ID: 'id',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    CPF: 'cpf',
    EMAIL: 'email',
    DATE_OF_BIRTH: 'date_of_birth',
    USER_ADDRESS_ID: 'user_address_id',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

export const USER_PASSWORD_TABLE = {
    ID: 'id',
    PASSWORD_HASH: 'password_hash',
    PASSWORD_SALT: 'password_salt',
    USER: 'user'
}

export const USER_CLINIC_UNIT_TABLE = {
    ID: 'id',
    USER: 'user',
    CLINIC_UNIT: 'clinic_unit',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

export const ADDRESS_TABLE = {
    ID: 'id',
    STREET: 'street',
    NUMBER: 'number',
    NEIGHBORHOOD: 'neighborhood',
    CITY: 'city',
    STATE: 'state',
    POSTAL_CODE: 'postal_code',
    COUNTRY: 'country',
    COMPLEMENT: 'complement',
    REFERENCE: 'reference',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

export const TENANT_TABLE = {
    ID: 'id',
    NAME: 'subdomain',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
}

export const CLINIC_TABLE = {
    ID: 'id',
    NAME: 'name',
    TENANT_NAME: 'tenant_name',
    CNPJ: 'cnpj',
    CLINIC_OWNER: 'clinic_owner',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

export const CLINIC_UNIT_TABLE = {
    ID: 'id',
    NAME: 'name',
    CLINIC: 'clinic',
    ACTIVE: 'active',
    ADDRESS: 'address',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

export const POSITION_TABLE = {
    ID: 'id',
    NAME: 'name',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

export const USER_TYPE_TABLE = {
    ID: 'id',
    NAME: 'name',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}

export const CLINIC_USER_TABLE = {
    ID: 'id',
    USER: 'user',
    POSITION: 'position',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}


export const APPOINTMENT_TABLE = {
    ID: 'id',
    USER: 'user',
    APPOINTMENT_TIME: 'appointment_time',
    DESCRIPTION: 'description',
    ACTIVE: 'active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
}