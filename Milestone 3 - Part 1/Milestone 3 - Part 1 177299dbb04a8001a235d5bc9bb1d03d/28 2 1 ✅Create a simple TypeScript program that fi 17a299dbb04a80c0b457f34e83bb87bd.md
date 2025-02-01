# 28.2.1 ✅Create a simple TypeScript program that finds average marks

**D28_S2_A1_ Create a simple TypeScript program that finds average marks**

# index.ts

```tsx
const studentNames1: string[] = ['Joh', 'Alice', 'Bob', 'Eve', 'Charlie'];
const studentMarks1: number[] = [85, 92, 78, 90, 88];

console.log('Student Names: ');

for(let i=0; i < studentNames1.length; i++ ){
    console.log(studentNames1[i]);
}

console.log('/nStudent Marks:');
for(let i=0; i < studentMarks1.length; i++ ){
    console.log(studentMarks1[i]);
}

const averageMarks: number = findAvg(studentMarks1);
console.log(`\nAverage Marks: ${averageMarks.toFixed(2)}`);

export function findAvg(marks: number[]): number{
    const totalMarks: number = marks.reduce((sum, mark) => sum + mark, 0 );
    const averageMarks: number = totalMarks/marks.length;
    return averageMarks;
}
```