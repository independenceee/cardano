# aiken/transaction/certificate

## Type

1. Certificate

- Chứng chỉ trên chuỗi chứng thực một số hoạt động. Xuất bản chứng chỉ/kích hoạt các loại quy tắc khác nhau; hầu hết thời gian, họ yêu cầu chữ ký từ/các khóa cụ thể.

Constructor
    - CredentialRegistration { delegator: StakeCredential }
    - CredentialDeregistration { delegator: StakeCredential }
    - CredentialDelegation { delegator: StakeCredential, delegatee: PoolId }
    - PoolRegistration { pool_id: PoolId, vrf: Hash<Blake2b_224, VerificationKey> }
    - PoolDeregistration { pool_id: PoolId, epoch: Int }
    - Governance
    - TreasuryMovement