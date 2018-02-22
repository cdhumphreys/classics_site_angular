import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { GapFillService } from '../../services/gap-fill.service';
import { SubjectsService } from '../../services/subjects.service';


@Component({
  selector: 'admin-results',
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.css']
})
export class AdminResultsComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  studentResultsPreview: any[] = [];
  chosenStudentData: any[] = [];

  yearGroups: string[] = [];
  courses: string[] = [];

  selectedYearGroup = '';
  selectedCourse = '';
  selectedCourseExercise = '';



  constructor(private gapFillService: GapFillService, private subjectsService: SubjectsService) {}

  ngOnInit() {
    this.gapFillService.getAllStudents().subscribe((snapshot) => {
      this.students = snapshot.filter((element) => {
        if (this.selectedYearGroup) {
          return !element.isAdmin && element.group == !this.selectedYearGroup;
        }
        return !element.isAdmin;
      })
      .map((studentData) => {
        let group = 'No group';
        if (studentData.group) {
          group = studentData.group;
        }
        if (!this.yearGroups.includes(group))  {
          this.yearGroups.push(group);
        }

        const newStudentData = {email: studentData.email, gapFills: [], group: group};
        const gapFillsArray = Object.keys(studentData.gapFills).map((key) => {
          return studentData.gapFills[key];
        });

        const gapFills = gapFillsArray.map((gapFill) => {
          const courseSlug = gapFill.course;
          const courseName = this.subjectsService.getSubjectName(courseSlug);
          if (!this.courses.includes(courseName)) {
            this.courses.push(courseName);
          }
          return {...gapFill, ...{course: gapFill.course, date: new Date(gapFill.date)}};
        })
        .sort((a, b) => {
          // sort by ascending name
          const usernameA = a.email.split('@')[0];
          const usernameB = b.email.split('@')[0];
          if (usernameA < usernameB) {
            return -1;
          }
          if (usernameA > usernameB) {
            return 1;
          }
          // sort by ascending course
          const nameA = a.course.toUpperCase(); // ignore upper and lowercase
          const nameB = b.course.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // if same course then sort by ascending exercise
          const sectionA = a.exercise.toUpperCase(); // ignore upper and lowercase
          const sectionB = b.exercise.toUpperCase(); // ignore upper and lowercase
          if (sectionA > sectionB) {
            return 1;
          }
          if (sectionA < sectionB) {
            return -1;
          }

          // if same course and section then sort by descending date
          const dateA = a.date;
          const dateB = b.date;

          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }

          return 0;
        });
        newStudentData.gapFills = gapFills;

        return newStudentData;
      })
      .sort((a, b) => {
        if (a.email > b.email) {
          return 1;
        }
        else if (a.email < b.email) {
          return -1;
        }

        return 0;
      });
      this.filteredStudents = this.students;
    });
  }

  onSelectYearGroup(event, group) {
    event.target.classList.add('active');

    if (this.selectedYearGroup == group) return;

    this.selectedYearGroup = group;

    const studentResults = this.students.filter((student) => {
      return !student.isAdmin && student.group == this.selectedYearGroup;
    })
    .map((student) => {
      const email = student.email;
      const group = student.group;

      const courseResults = {};

      student.gapFills.map(gapFill => {
        const courseName = this.subjectsService.getSubjectName(gapFill.course);
        if (!courseResults[courseName]) {
          courseResults[courseName] = {};
        }

        if (!courseResults[courseName][gapFill.exercise]) {
          courseResults[courseName][gapFill.exercise] = [];
        }
        courseResults[courseName][gapFill.exercise].push(gapFill.percentage);
      });
      const results = [];
      for (let course in courseResults) {
        for (let exercise in courseResults[course]) {

          const averageScore = courseResults[course][exercise].reduce((total, percentage, index, array) => {
            total += percentage;

            if (index == array.length - 1) {
              return total/array.length;
            }

            return total;
          }, 0).toFixed(0);

          const highestScore = Math.max(...courseResults[course][exercise]);

          results.push({email, group, course, exercise: exercise, averageScore, highestScore})
        }
      }
      return results;
    });
    this.studentResultsPreview = Array.prototype.concat(...studentResults);
  }

  onSelectExercise(event) {
    this.chosenStudentData = this.students.filter((student) => {
      return !student.isAdmin;
    })
    .map(student => {
      const filteredGapFills = student.gapFills.filter(gapFill => {
        return gapFill.course == this.subjectsService.getSubjectSlug(event.course) && gapFill.exercise == event.exercise;
      })
      .map(gapFill => {
        return {...gapFill, course: event.course};
      });

      return {...student, gapFills: filteredGapFills};
    });
  }

}
