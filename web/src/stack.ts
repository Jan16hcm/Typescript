export class Stack<T> {
    private items: T[] = [];

    public constructor() {}

    public push(data: T): void {
        this.items.push(data);
    }

    public pop(): T | undefined {
        return this.items.pop();
    }

    public peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    public size(): number {
        return this.items.length;
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    public clear(): void {
        this.items = [];
    }
}