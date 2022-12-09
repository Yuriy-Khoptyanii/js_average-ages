'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menSex = 'm';

  const onlyMen = people.filter(men => century
    ? men.sex === menSex && Math.ceil(men.died / 100) === century
    : men.sex === menSex);

  const MenYearsOfLife = getYearsOfLife(onlyMen);

  const menAverage = getAverageAge(MenYearsOfLife, MenYearsOfLife.length);

  return menAverage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenWithChildren = people.filter(person => {
    const allWoman = person.sex === 'f';

    if (withChildren) {
      return people.some(child => child.mother === person.name);
    }

    return allWoman;
  });

  const womenYearsOfLife = getYearsOfLife(womenWithChildren);

  const womenAverage = getAverageAge(womenYearsOfLife, womenYearsOfLife.length);

  return womenAverage;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = people.filter(child => onlyWithSon
    ? people.some(mom => child.mother === mom.name) && child.sex === 'm'
    : people.some(mom => child.mother === mom.name));

  const differenceAge = childs.map(
    child => child.born - people.find(mom => mom.name === child.mother).born);

  const differenceAverageAge = getAverageAge(differenceAge, childs.length);

  return differenceAverageAge;
}

const getYearsOfLife = (people) => {
  return people.map(person => person.died - person.born);
};

const getAverageAge = (yearsLife, numberOfYearsLife) => {
  return yearsLife.reduce((sum, years) => sum + years, 0) / numberOfYearsLife;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
