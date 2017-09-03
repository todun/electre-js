/**
 * Matrix Operations module
 * @module electre/utils/operations
 */

/** MatrixOperations class */
class MatrixOperations {
  /**
   * getColumnSum
   * @memberof MatrixOperations
   * @method getColumnSum
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getColumnSum(array) {
    const arrayC = Array(array[0].length).fill(0);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let i;
      for (i = 0; i < array.length; i += 1) {
        arrayC[j] += array[i][j];
      }
    }
    return arrayC;
  }

  /**
   * getElementCountZero
   * @memberof MatrixOperations
   * @method getElementCountZero
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getElementCountZero(array) {
    let elementcount = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      if (array[i] === 0) {
        elementcount += 1;
      }
    }
    return elementcount;
  }

  /**
   * getNormalizedPerformanceMatrix
   * @memberof MatrixOperations
   * @method getNormalizedPerformanceMatrix
   * @static
   * @param {number[][]} array
   * @returns {number[][]}
   */

  static getNormalizedPerformanceMatrix(array) {
    const arrayNPM = [];
    const a = this.getColumnSum(array);
    let i;
    let j;
    for (i = 0; i < array.length; i += 1) {
      const row = [];
      for (j = 0; j < array[0].length; j += 1) {
        row.push(array[i][j] / a[j]);
      }
      arrayNPM.push(row);
    }
    return arrayNPM;
  }

  /**
   * getDelta
   * @memberof MatrixOperations
   * @method getDelta
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getDelta(array) {
    const arrayDelta = Array(array[0].length).fill(0);
    const a = this.getMaxValueInColumn(array);
    const b = this.getMinValueInColumn(array);
    let i;
    for (i = 0; i < array[0].length; i += 1) {
      arrayDelta[i] = a[i] - b[i];
    }
    return arrayDelta;
  }

  /**
   * getMinValueInColumn
   * @memberof MatrixOperations
   * @method getMinValueInColumn
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getMinValueInColumn(array) {
    const arrayMin = Array(array[0].length).fill(0);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let min = array[0][j];
      let i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i][j] <= min) {
          min = array[i][j];
          arrayMin[j] = array[i][j];
        }
      }
    }
    return arrayMin;
  }

  /**
   * getMaxValueInColumn
   * @memberof MatrixOperations
   * @method getMaxValueInColumn
   * @static
   * @param {number[][]} array
   * @returns {number[]}
   */

  static getMaxValueInColumn(array) {
    const arrayMax = Array(array[0].length).fill(0);
    let j;
    for (j = 0; j < array[0].length; j += 1) {
      let max = array[0][j];
      let i;
      for (i = 0; i < array.length; i += 1) {
        if (array[i][j] >= max) {
          max = array[i][j];
          arrayMax[j] = array[i][j];
        }
      }
    }
    return arrayMax;
  }

  /**
   * getMaxValueInRowSorting
   * @memberof MatrixOperations
   * @method getMaxValueInRowSorting
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getMaxValueInRowSorting(array) {
    array.sort((a, b) => b - a);
    const max = array[0];
    return max;
  }

  /**
   * getNormalizedWeigths
   * @memberof MatrixOperations
   * @method getNormalizedWeigths
   * @static
   * @param {number[]} array
   * @returns {number[]}
   */

  static getNormalizedWeigths(array) {
    const arrayNW = Array(array.length).fill(0);
    const sum = this.getWeightsSum(array);
    let i;
    for (i = 0; i < array.length; i += 1) {
      arrayNW[i] = array[i] / sum;
    }
    return arrayNW;
  }

  /**
   * getWeightsSum
   * @memberof MatrixOperations
   * @method getWeightsSum
   * @static
   * @param {number[]} array
   * @returns {number}
   */

  static getWeightsSum(array) {
    let sum = 0;
    let i;
    for (i = 0; i < array.length; i += 1) {
      sum += array[i];
    }
    return sum;
  }
}

export { MatrixOperations as default };
