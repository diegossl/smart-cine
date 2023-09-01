export interface IUseCase<I, O> {
  execute(params: I): Promise<O>;
}
